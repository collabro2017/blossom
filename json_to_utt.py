from __future__ import print_function
import sys
import os
from os import path
import json
from pprint import pprint
import math
import argparse
from collections import OrderedDict

IBM_RESULTS_DIR = '/Users/adamg/te/Polli/ASR/ibm/sst-python/output'
VIZ_OUT_DIR = '/Users/adamg/te/Polli/ASR/ibm/speech-viz'
CSV_OUT_DIR = '/Users/adamg/te/Polli/ASR/ibm/utterance-csv'


def read_jsons():

    # list of dictionaries, one for each file
    # each dictionary contains a list of dictionaries, one dictionary per token
    all_files_info = []

    for json_file_name in os.listdir(IBM_RESULTS_DIR):
        if '.json' in json_file_name:
            
            file_dct = OrderedDict()
            
            all_tokens_info = []
            file_dct[json_file_name] = all_tokens_info

            with open(path.join(IBM_RESULTS_DIR,json_file_name)) as json_file:
                # read file into memory, made up of multile json objects
                j_str = json_file.read()
                # add split tag between json objects
                tweaked_json = j_str.replace('}{','}<SPLIT>{')
                # split json string by split tag
                split_json = tweaked_json.split('<SPLIT>')
                # parse each json object and add to list
                parsed_json = [json.loads(json_bit) for json_bit in split_json]

                # get timestamps and confidence of words in final hypothesis
                previous_end = -1
                for j in parsed_json:
                    # this is where the data is embedded
                    data = j['results'][0]['alternatives'][0]
                    if j['results'][0]['final'] == True and \
                        'word_confidence' in data:
                        print("Parsing {}".format(json_file_name+" "+str(j['result_index'])))
                        # print(len(data['timestamps']),len(data['word_confidence'])) # should be ==
                        timestamps = data['timestamps']
                        confidence = data['word_confidence']
                        # print timestamps and confidence for each word token
                        
                        for i in range(len(data['word_confidence'])):
                            # sanity check to make sure lists are the same
                            if timestamps[i][0] != confidence[i][0]:
                                print('Unequal word lists: idx {}, {} != {}'.format(i,timestamps[i][0],confidence[i][0]))
                                break
                            else:
                                token_dct = OrderedDict()
                                token_dct['token'] = timestamps[i][0]
                                token_dct['token_begin'] = timestamps[i][1]
                                token_dct['token_end'] = timestamps[i][2]
                                token_dct['word_conf'] = confidence[i][1]
                                # calculate leading pause
                                if previous_end == -1:
                                    token_dct['previous_pause'] = token_dct['token_begin']/10
                                else:
                                    token_dct['previous_pause'] = token_dct['token_begin'] \
                                                                  - previous_end
                                previous_end = token_dct['token_end']

                                all_tokens_info.append(token_dct)

                all_files_info.append(file_dct)

    return all_files_info


def produce_html_visualization(file_info=[]):
    
    with open(path.join(VIZ_OUT_DIR,'results.html'),'w') as speech_html_out:
        speech_html_out.write('<html>')
        speech_html_out.write('\n')

        for file_dct in file_info:
            file_id = file_dct.keys()[0] 
            token_list = file_dct[file_id]

            # # add heading to html file
            speech_html_out.write('<h2>'+file_id[:-5]+'</h2')
            speech_html_out.write('\n')
            
            for token in token_list:
                # print(all_tokens_info[t])
                pre_token_pause = token['previous_pause']
                # if no pause, just print leading space. if pause, print underscore(s)
                pre_pause_spacing = -1 if pre_token_pause == 0.0 \
                                    else int(math.ceil(pre_token_pause*10))
                pre_token_separator = " " if pre_pause_spacing == -1 else "_"*pre_pause_spacing
                
                # if confidence below threshold, print word in grey
                confidence_color = '#8c8c8c' if token['word_conf'] <= 0.5 else '#000000'
    
                token_html = '<span style="color:{};">{}</span>'.format(confidence_color,token['token'])            
                speech_html_out.write(pre_token_separator + token_html)
                
        speech_html_out.write('\n')

        speech_html_out.write('</html>')

    return

def produce_csv_file(file_info=[]):

    with open(path.join(CSV_OUT_DIR,'results.csv'),'w') as csv_out:

        print_headers = True       

        for file_dct in file_info:
            file_id = file_dct.keys()[0] 
            token_list = file_dct[file_id]
            feature_count = len(token_list[0].keys()) + 1

            print_count = 0
            if print_headers:
                csv_out.write("FileID")
                csv_out.write(',')
                print_count += 1
                for feature_name in token_list[0].keys():
                    csv_out.write(feature_name)
                    print_count += 1
                    if print_count < feature_count:
                        csv_out.write(',')
                    else:
                        csv_out.write('\n')
                        print_count = 0
                print_headers = False

            # iterate through token's features, and add to csv
            for token in token_list:
                # add file id to beginning of line
                csv_out.write(file_id[:-5])
                csv_out.write(',')
                print_count += 1
                for key,value in token.iteritems():
                    csv_out.write(str(value))
                    if print_count < feature_count-1:
                        csv_out.write(',')
                        print_count += 1
                    else:
                        csv_out.write('\n')
                        print_count = 0
                    
    return


if __name__ == '__main__':

    # parse command line parameters
    parser = argparse.ArgumentParser(description='Convert JSONs to readable printouts of utterance timing')
    parser.add_argument('-viz', action='store_true', dest='vizOut', help='produce an html visualization of utterances')
    parser.add_argument('-csv', action='store_true', dest='csvOut', help='produce a csv of utterance information')
    args = parser.parse_args()

    info = read_jsons()

    if args.vizOut:
        produce_html_visualization(info)

    if args.csvOut:
        produce_csv_file(info)

